package com.ims.source.dtos;

import com.ims.constants.enums.IncidentStatus;
import com.ims.constants.enums.Priority;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IncidentDTO {

    String id;

    String reporterName;

    String detail;

    Date reportDate;

    Priority priority;

    IncidentStatus status;

}
