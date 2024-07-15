package com.ims.source.commandobjects;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordCommand {

    @NotNull
    Integer otp;

    @NotNull
    String email;

    @NotBlank
    String password;

    @NotBlank
    String confirmPassword;
}
