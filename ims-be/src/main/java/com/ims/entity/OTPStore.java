package com.ims.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OTPStore implements Serializable {

    @Serial
    private static final long serialVersionUID = 3508521821823322711L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer otp;

    @OneToOne
    @JoinColumn(name = "user_id")
    User user;

}
