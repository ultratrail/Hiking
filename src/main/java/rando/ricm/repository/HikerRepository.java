package rando.ricm.repository;

import rando.ricm.domain.Hiker;
import rando.ricm.domain.User;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Hiker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HikerRepository extends JpaRepository<Hiker, Long> {
    @Query("select distinct hiker from Hiker hiker left join fetch hiker.itineraries")
    List<Hiker> findAllWithEagerRelationships();

    @Query("select hiker from Hiker hiker left join fetch hiker.itineraries where hiker.id =:id")
    Hiker findOneWithEagerRelationships(@Param("id") Long id);

    Hiker findOneByUser(User user);

}
