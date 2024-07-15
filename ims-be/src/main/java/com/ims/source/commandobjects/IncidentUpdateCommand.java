package com.ims.source.commandobjects;

import com.ims.constants.enums.IncidentStatus;
import com.ims.constants.enums.Priority;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IncidentUpdateCommand {

    @NotNull
    String id;

    String detail;

    Priority priority;

    IncidentStatus status;

}
