package com.ims.controller;

import com.ims.service.IncidentService;
import com.ims.source.commandobjects.IncidentCommand;
import com.ims.source.commandobjects.IncidentUpdateCommand;
import com.ims.source.dtos.IncidentDTO;
import com.ims.utils.ResponseHandler;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("incident")
public class IncidentController {

    final IncidentService incidentService;

    @PostMapping("create")
    public ResponseEntity<ResponseHandler<IncidentDTO>> create(@RequestBody IncidentCommand incidentCommand) {
        ResponseHandler<IncidentDTO> responseHandler = incidentService.createIncident(incidentCommand);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @PutMapping("update")
    public ResponseEntity<ResponseHandler<IncidentDTO>> update(@RequestBody IncidentUpdateCommand updateCommand) {
        ResponseHandler<IncidentDTO> responseHandler = incidentService.updateCommand(updateCommand);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @GetMapping("getByUser/{userId}")
    public ResponseEntity<ResponseHandler<List<IncidentDTO>>> getIncidentByUserId(@PathVariable Long userId) {
        ResponseHandler<List<IncidentDTO>> responseHandler = incidentService.getIncidentByUserId(userId);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @GetMapping("getById")
    public ResponseEntity<ResponseHandler<List<IncidentDTO>>> getIncidentByIdLike(@RequestParam String idLike) {
        ResponseHandler<List<IncidentDTO>> responseHandler = incidentService.getIncidentByIdLike(idLike);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<ResponseHandler<String>> delete(@PathVariable String id) {
        ResponseHandler<String> responseHandler = incidentService.deleteIncident(id);
        return new ResponseEntity<>(responseHandler, HttpStatus.valueOf(responseHandler.getStatusCode()));
    }

}
