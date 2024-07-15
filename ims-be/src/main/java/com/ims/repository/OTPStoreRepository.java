package com.ims.repository;

import com.ims.entity.OTPStore;
import com.ims.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OTPStoreRepository extends JpaRepository<OTPStore, Long> {

    OTPStore findByUser(User user);
}
