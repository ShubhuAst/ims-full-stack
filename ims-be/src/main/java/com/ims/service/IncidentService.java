package com.ims.service;

import com.ims.source.commandobjects.IncidentCommand;
import com.ims.source.commandobjects.IncidentUpdateCommand;
import com.ims.source.dtos.IncidentDTO;
import com.ims.utils.ResponseHandler;

import java.util.List;

public interface IncidentService {
    ResponseHandler<IncidentDTO> createIncident(IncidentCommand incidentCommand);

    ResponseHandler<IncidentDTO> updateCommand(IncidentUpdateCommand updateCommand);

    ResponseHandler<List<IncidentDTO>> getIncidentByUserId(Long userId);

    ResponseHandler<String> deleteIncident(String id);

    ResponseHandler<List<IncidentDTO>> getIncidentByIdLike(String id);
}
