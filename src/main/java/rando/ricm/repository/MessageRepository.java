package rando.ricm.repository;

import rando.ricm.domain.Hike;
import rando.ricm.domain.Hiker;
import rando.ricm.domain.Message;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
	// This query return a Page with all Messages of the Hiker in the Hike order by date
	Page<Message> findAllBySenderAndHikeOrderByDatetime(Pageable pageable,Hiker hiker, Hike hike);
}
