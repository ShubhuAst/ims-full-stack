package com.ims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address implements Serializable {

    @Serial
    private static final long serialVersionUID = 3571901404356400655L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull(message = "City Can't be Null")
    String city;

    @NotNull(message = "State Can't be Null")
    String state;

    @NotNull(message = "Country Can't be Null")
    String country;

    @NotNull(message = "Address Line Can't be Null")
    String addressLine;

    @NotNull(message = "Zip Code Can't be Null")
    String zipCode;

    @Version
    Long version;
}
