package com.ims.service;

import com.ims.source.commandobjects.LoginCommand;
import com.ims.source.commandobjects.RegisterCommand;
import com.ims.source.commandobjects.ResetPasswordCommand;
import com.ims.source.dtos.UserDTO;
import com.ims.utils.ResponseHandler;

public interface UserService {

    ResponseHandler<UserDTO> registerUser(RegisterCommand registerCommand);

    ResponseHandler<UserDTO> loginUser(LoginCommand loginCommand);

    ResponseHandler forgotpassword(String username);

    ResponseHandler resetPassword(ResetPasswordCommand resetPasswordCommand);
}
