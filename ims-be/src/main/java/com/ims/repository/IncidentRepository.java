package com.ims.repository;

import com.ims.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, String> {

    @Query(nativeQuery = true, value = "select * from incident where user_id = :id")
    List<Incident> findAllByUser(@Param("id") Long id);

    List<Incident> findByIdStartingWith(String id);

}
