package com.ims.constants.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AppResponse {

    USER_ALREADY_EXIST(HttpStatus.CONFLICT, "User Already Exist"),
    USER_CREATED(HttpStatus.CREATED, "User Created Successfully"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User Not Found"),
    USER_LOGIN_SUCCESS(HttpStatus.OK, "User Login Successfully"),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "User Password Mismatch"),
    PASSWORD_RESET_SUCCESS(HttpStatus.OK, "Password Reset Successfully"),

    INCIDENT_CREATED(HttpStatus.CREATED, "Incident Created Successfully"),
    INCIDENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Incident Not Found"),
    INCIDENT_UPDATED(HttpStatus.OK, "Incident Updated Successfully"),
    INCIDENT_DELETED(HttpStatus.OK, "Incident Deleted Successfully"),

    OTP_SEND(HttpStatus.OK, "OTP send successfully"),
    OTP_NOT_FOUND(HttpStatus.NOT_FOUND, "OTP Not Found"),
    OTP_INVALID(HttpStatus.BAD_REQUEST, "Invalid OTP"),

    SUCCESS(HttpStatus.OK, "Success"),

    AUTHORIZATION_FAILURE(HttpStatus.UNAUTHORIZED, "User Don't Have Access to This Resource"),
    AUTHENTICATION_FAILURE(HttpStatus.FORBIDDEN, "Invalid Credential");


    private final HttpStatus status;
    private final String msg;

    AppResponse(HttpStatus status, String msg) {
        this.status = status;
        this.msg = msg;
    }

}
