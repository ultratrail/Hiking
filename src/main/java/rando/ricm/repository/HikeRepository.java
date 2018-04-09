package rando.ricm.repository;

import rando.ricm.domain.Hike;
import rando.ricm.domain.Hiker;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Hike entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HikeRepository extends JpaRepository<Hike, Long> {

  // This is where you implement queries ! 

  // We didn't detail the query ! JPA query recgnize "findAll -> SELECT *

  Page<Hike> findAllByWalkers(Pageable pageable,Hiker user);

  Hike findOneById(Long id);
}
