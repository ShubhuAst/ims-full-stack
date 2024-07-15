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
public class AddressDTO {

    Long id;

    String city;

    String state;

    String country;

    String addressLine;

    String zipCode;
}
