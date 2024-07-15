package com.ims.source.commandobjects;

import com.ims.config.SpringContext;
import com.ims.entity.Address;
import com.ims.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterCommand {

    String email;

    String firstName;

    String lastName;

    String contactNumber;

    String password;

    String confirmPassword;

    String city;

    String state;

    String country;

    String addressLine;

    String zipCode;

    public User getUserFromCommand() {
        ModelMapper modelMapper = SpringContext.getBean(ModelMapper.class);
        User user = modelMapper.map(this, User.class);
        Address address = modelMapper.map(this, Address.class);
        user.setAddress(address);
        return user;
    }
}
