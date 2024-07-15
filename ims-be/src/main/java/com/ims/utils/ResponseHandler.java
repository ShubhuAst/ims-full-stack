package com.ims.utils;

import com.ims.constants.enums.AppResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseHandler<T> {

    T data;
    String msg;
    int statusCode;

    public ResponseHandler(T data, AppResponse appResponse) {

        this.data = data;
        this.msg = appResponse.getMsg();
        this.statusCode = appResponse.getStatus().value();
    }

    public ResponseHandler(AppResponse appResponse) {

        this.data = null;
        this.msg = appResponse.getMsg();
        this.statusCode = appResponse.getStatus().value();
    }
}
