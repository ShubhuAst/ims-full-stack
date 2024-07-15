package com.ims.source.commandobjects;

import com.ims.constants.enums.IncidentStatus;
import com.ims.constants.enums.Priority;
import com.ims.entity.Incident;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IncidentCommand {

    @NotNull
    Long userId;

    String reporterName;

    String detail;

    @Temporal(TemporalType.TIMESTAMP)
    Date reportDate;

    Priority priority;

    IncidentStatus status;

    public Incident getIncidentFromCommand() {
        return Incident.builder()
                .reporterName(reporterName)
                .detail(detail)
                .reportDate(reportDate)
                .priority(priority)
                .status(status)
                .build();
    }

}
