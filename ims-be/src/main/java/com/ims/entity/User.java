package com.ims.entity;

import com.ims.config.SpringContext;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.Serial;
import java.util.Collection;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends Auditable implements UserDetails {

    @Serial
    private static final long serialVersionUID = 3439428774046999498L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    @Email(message = "Please provide a valid email address")
    String email;

    String firstName;

    String lastName;

    String contactNumber;

    @NotBlank
    String password;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id")
    Address address;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<Incident> incidentList;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        PasswordEncoder encoder = SpringContext.getBean(PasswordEncoder.class);
        this.password = encoder.encode(password);
    }

    @Override
    public String getUsername() {
        return email;
    }
}
