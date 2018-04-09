package rando.ricm.service;

import rando.ricm.domain.Hike;
import rando.ricm.domain.Hiker;
import rando.ricm.repository.HikeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Hike.
 */
@Service
@Transactional
public class HikeService {

    private final Logger log = LoggerFactory.getLogger(HikeService.class);

    private final HikeRepository hikeRepository;

    public HikeService(HikeRepository hikeRepository) {
        this.hikeRepository = hikeRepository;
    }

    /**
     * Save a hike.
     *
     * @param hike the entity to save
     * @return the persisted entity
     */
    public Hike save(Hike hike) {
        log.debug("Request to save Hike : {}", hike);
        return hikeRepository.save(hike);
    }

    /**
     * Get all the hikes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Hike> findAll(Pageable pageable) {
        log.debug("Request to get all Hikes");
        return hikeRepository.findAll(pageable);
    }

    /**
     * Get one hike by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Hike findOne(Long id) {
        log.debug("Request to get Hike : {}", id);
        return hikeRepository.findOne(id);
    }

    /**
     * Get all the hikes.
     *
     * @param pageable the pagination information
     * @param user the hiker
     * @return the list of Hikes of a specific User (a user can participate in many hikes)
     */
    @Transactional(readOnly = true)
    public Page<Hike> findAllByWalkers(Pageable pageable, Hiker user) {
      log.debug("Request to get Hikes from user : {}", user);
      return hikeRepository.findAllByWalkers(pageable, user);
    }

    /**
     * Delete the hike by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Hike : {}", id);
        hikeRepository.delete(id);
    }
}
