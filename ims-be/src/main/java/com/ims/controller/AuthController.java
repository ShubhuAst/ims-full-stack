package com.ims.controller;

import com.ims.service.UserService;
import com.ims.source.commandobjects.LoginCommand;
import com.ims.source.commandobjects.RegisterCommand;
import com.ims.source.commandobjects.ResetPasswordCommand;
import com.ims.source.dtos.UserDTO;
import com.ims.utils.ResponseHandler;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("auth")
public class AuthController {

    final UserService userService;

    @PostMapping("signup")
    public ResponseEntity<ResponseHandler<UserDTO>> register(@RequestBody RegisterCommand registerCommand) {
        ResponseHandler<UserDTO> responseHandler = userService.registerUser(registerCommand);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @PostMapping("signin")
    public ResponseEntity<ResponseHandler<UserDTO>> login(@RequestBody @Valid LoginCommand loginCommand) {
        ResponseHandler<UserDTO> responseHandler = userService.loginUser(loginCommand);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @PostMapping("forgotPassword/{username}")
    public ResponseEntity<ResponseHandler> forgotPassword(@PathVariable String username) {
        ResponseHandler responseHandler = userService.forgotpassword(username);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @PostMapping("resetPassword")
    public ResponseEntity<ResponseHandler> resetPassword(@RequestBody @Valid ResetPasswordCommand resetPasswordCommand) {
        ResponseHandler responseHandler = userService.resetPassword(resetPasswordCommand);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

}
