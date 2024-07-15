package com.ims.service.impls;

import com.ims.constants.enums.AppResponse;
import com.ims.entity.OTPStore;
import com.ims.entity.User;
import com.ims.repository.OTPStoreRepository;
import com.ims.repository.UserRepository;
import com.ims.service.EmailSenderService;
import com.ims.service.UserService;
import com.ims.source.commandobjects.LoginCommand;
import com.ims.source.commandobjects.RegisterCommand;
import com.ims.source.commandobjects.ResetPasswordCommand;
import com.ims.source.dtos.AddressDTO;
import com.ims.source.dtos.UserDTO;
import com.ims.utils.ResponseHandler;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserServiceImpl implements UserService {

    final UserRepository userRepository;
    final AuthenticationManager authenticationManager;
    final ModelMapper modelMapper;
    final OTPStoreRepository otpStoreRepository;
    final EmailSenderService emailSenderService;

    @Override
    public ResponseHandler<UserDTO> registerUser(RegisterCommand registerCommand) {
        if (!registerCommand.getPassword().equals(registerCommand.getConfirmPassword())) {
            return new ResponseHandler<>(AppResponse.PASSWORD_MISMATCH);
        }
        if (userRepository.existsByEmail(registerCommand.getEmail())) {
            return new ResponseHandler<>(AppResponse.USER_ALREADY_EXIST);
        }
        User user = registerCommand.getUserFromCommand();
        userRepository.save(user);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword(registerCommand.getPassword());
        userDTO.setAddressDTO(modelMapper.map(user.getAddress(), AddressDTO.class));
        return new ResponseHandler<>(userDTO, AppResponse.USER_CREATED);
    }

    @Override
    public ResponseHandler<UserDTO> loginUser(LoginCommand loginCommand) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginCommand.getEmail(), loginCommand.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword(loginCommand.getPassword());
        userDTO.setAddressDTO(modelMapper.map(user.getAddress(), AddressDTO.class));
        return new ResponseHandler<>(userDTO, AppResponse.USER_LOGIN_SUCCESS);
    }


    @Override
    public ResponseHandler forgotpassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseHandler<>(AppResponse.USER_NOT_FOUND);
        }
        User user = userOptional.get();
        OTPStore oldOtpStore = otpStoreRepository.findByUser(user);
        if (oldOtpStore != null) {
            otpStoreRepository.delete(oldOtpStore);
        }
        Integer otp = new Random().nextInt(900000) + 100000;
        OTPStore otpStore = OTPStore.builder()
                .otp(otp)
                .user(user)
                .build();
        otpStoreRepository.save(otpStore);
        emailSenderService.sendSimpleEmail(userOptional.get().getEmail(), "OTP to Reset Password for user " + userOptional.get().getEmail() + " is: " + otp, "IMS: Reset Password OTP");
        return new ResponseHandler(AppResponse.OTP_SEND);
    }

    @Override
    public ResponseHandler resetPassword(ResetPasswordCommand resetPasswordCommand) {
        if (!resetPasswordCommand.getPassword().equals(resetPasswordCommand.getConfirmPassword())) {
            return new ResponseHandler<>(AppResponse.PASSWORD_MISMATCH);
        }
        Optional<User> userOptional = userRepository.findByEmail(resetPasswordCommand.getEmail());
        if (userOptional.isEmpty()) {
            return new ResponseHandler<>(AppResponse.USER_NOT_FOUND);
        }
        User user = userOptional.get();
        OTPStore otpStore = otpStoreRepository.findByUser(user);
        if (otpStore == null) {
            return new ResponseHandler<>(AppResponse.OTP_NOT_FOUND);
        }
        if (!otpStore.getOtp().equals(resetPasswordCommand.getOtp())) {
            return new ResponseHandler<>(AppResponse.OTP_INVALID);
        }
        user.setPassword(resetPasswordCommand.getPassword());
        userRepository.save(user);
        otpStoreRepository.delete(otpStore);
        return new ResponseHandler(AppResponse.PASSWORD_RESET_SUCCESS);
    }

}
