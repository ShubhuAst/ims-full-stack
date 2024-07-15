package com.ims.entity;

import com.ims.config.SpringContext;
import com.ims.constants.enums.IncidentStatus;
import com.ims.constants.enums.Priority;
import com.ims.repository.IncidentRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;
import java.time.Year;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Incident implements Serializable {

    @Serial
    private static final long serialVersionUID = -8377208250440341599L;

    @Id
    String id;

    @NotNull
    String reporterName;

    String detail;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    Date reportDate;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    Priority priority;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    IncidentStatus status;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Version
    Long version;

    @PrePersist
    private void generateId() {
        if (id == null) {
            boolean idGenerated = false;
            while (!idGenerated) {
                int randomNum = (int) (Math.random() * 90000) + 10000;
                int year = Year.now().getValue();
                String candidateId = "RMG" + randomNum + year;
                if (isIdUnique(candidateId)) {
                    id = candidateId;
                    idGenerated = true;
                }
            }
        }
    }

    private boolean isIdUnique(String candidateId) {
        return !SpringContext.getBean(IncidentRepository.class).existsById(candidateId);
    }
}
