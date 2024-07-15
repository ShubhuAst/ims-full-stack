package com.ims.service.impls;

import com.ims.constants.enums.AppResponse;
import com.ims.entity.Incident;
import com.ims.entity.User;
import com.ims.repository.IncidentRepository;
import com.ims.repository.UserRepository;
import com.ims.service.IncidentService;
import com.ims.source.commandobjects.IncidentCommand;
import com.ims.source.commandobjects.IncidentUpdateCommand;
import com.ims.source.dtos.IncidentDTO;
import com.ims.utils.ResponseHandler;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IncidentServiceImpl implements IncidentService {

    final IncidentRepository incidentRepository;
    final UserRepository userRepository;
    final ModelMapper modelMapper;

    @Override
    public ResponseHandler<IncidentDTO> createIncident(IncidentCommand incidentCommand) {
        Optional<User> userOptional = userRepository.findById(incidentCommand.getUserId());
        if (userOptional.isEmpty()) {
            return new ResponseHandler<>(AppResponse.USER_NOT_FOUND);
        }
        Incident incident = incidentCommand.getIncidentFromCommand();
        incident.setUser(userOptional.get());
        incidentRepository.save(incident);
        return new ResponseHandler<>(modelMapper.map(incident, IncidentDTO.class), AppResponse.INCIDENT_CREATED);
    }

    @Override
    public ResponseHandler<IncidentDTO> updateCommand(IncidentUpdateCommand updateCommand) {
        Optional<Incident> incidentOptional = incidentRepository.findById(updateCommand.getId());
        if (incidentOptional.isEmpty()) {
            return new ResponseHandler<>(AppResponse.INCIDENT_NOT_FOUND);
        }
        Incident incident = incidentOptional.get();
        modelMapper.map(updateCommand, incident);
        incidentRepository.save(incident);
        return new ResponseHandler<>(modelMapper.map(incident, IncidentDTO.class), AppResponse.INCIDENT_UPDATED);
    }

    @Override
    public ResponseHandler<List<IncidentDTO>> getIncidentByUserId(Long userId) {
        List<Incident> incidents = incidentRepository.findAllByUser(userId);
        List<IncidentDTO> incidentDTOS = new ArrayList<>();
        incidents.forEach(incident -> incidentDTOS.add(modelMapper.map(incident, IncidentDTO.class)));
        return new ResponseHandler<List<IncidentDTO>>(incidentDTOS, AppResponse.SUCCESS);
    }

    @Override
    public ResponseHandler<List<IncidentDTO>> getIncidentByIdLike(String id) {
        List<Incident> incidents = incidentRepository.findByIdStartingWith(id);
        List<IncidentDTO> incidentDTOS = new ArrayList<>();
        incidents.forEach(incident -> incidentDTOS.add(modelMapper.map(incident, IncidentDTO.class)));
        return new ResponseHandler<List<IncidentDTO>>(incidentDTOS, AppResponse.SUCCESS);
    }

    @Override
    public ResponseHandler<String> deleteIncident(String id) {
        Optional<Incident> incidentOptional = incidentRepository.findById(id);
        if (incidentOptional.isEmpty()) {
            return new ResponseHandler<>(AppResponse.INCIDENT_NOT_FOUND);
        }
        incidentRepository.delete(incidentOptional.get());
        return new ResponseHandler<>(incidentOptional.get().getId(), AppResponse.INCIDENT_DELETED);
    }
}
