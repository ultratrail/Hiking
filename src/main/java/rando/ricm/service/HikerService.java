package rando.ricm.service;

import rando.ricm.domain.Hiker;
import rando.ricm.repository.HikerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Hiker.
 */
@Service
@Transactional
public class HikerService {

    private final Logger log = LoggerFactory.getLogger(HikerService.class);

    private final HikerRepository hikerRepository;

    public HikerService(HikerRepository hikerRepository) {
        this.hikerRepository = hikerRepository;
    }

    /**
     * Save a hiker.
     *
     * @param hiker the entity to save
     * @return the persisted entity
     */
    public Hiker save(Hiker hiker) {
        log.debug("Request to save Hiker : {}", hiker);
        return hikerRepository.save(hiker);
    }

    /**
     * Get all the hikers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Hiker> findAll(Pageable pageable) {
        log.debug("Request to get all Hikers");
        return hikerRepository.findAll(pageable);
    }

    /**
     * Get one hiker by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Hiker findOne(Long id) {
        log.debug("Request to get Hiker : {}", id);
        return hikerRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the hiker by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Hiker : {}", id);
        hikerRepository.delete(id);
    }
}
