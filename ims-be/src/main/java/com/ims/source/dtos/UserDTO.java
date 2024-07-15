package com.ims.source.dtos;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {

    Long id;

    String email;

    String password;

    String firstName;

    String lastName;

    String contactNumber;

    AddressDTO addressDTO;

}
