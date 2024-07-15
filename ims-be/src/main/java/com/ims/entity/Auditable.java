package com.ims.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PROTECTED)
public class Auditable {

    @NotNull
    @CreatedBy
    @Column(nullable = false, updatable = false)
    String createdBy;

    @NotNull
    @CreatedDate
    @Column(nullable = false, updatable = false)
    Date createdDate;

    @LastModifiedDate
    Date lastModifiedDate;

    @LastModifiedBy
    String lastModifiedBy;

    @Version
    Long version;
}
