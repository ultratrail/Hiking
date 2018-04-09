package rando.ricm.web.rest;

import com.codahale.metrics.annotation.Timed;
import rando.ricm.domain.Hike;
import rando.ricm.domain.Hiker;
import rando.ricm.domain.User;
import rando.ricm.repository.HikerRepository;
import rando.ricm.repository.UserRepository;
import rando.ricm.security.SecurityUtils;
import rando.ricm.service.HikeService;
import rando.ricm.web.rest.errors.BadRequestAlertException;
import rando.ricm.web.rest.util.HeaderUtil;
import rando.ricm.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hike.
 */
@RestController
@RequestMapping("/api")
public class HikeResource {

    private final Logger log = LoggerFactory.getLogger(HikeResource.class);

    private static final String ENTITY_NAME = "hike";

    private final HikeService hikeService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HikerRepository hikerRepository;

    public HikeResource(HikeService hikeService) {
        this.hikeService = hikeService;
    }

    /**
     * POST  /hikes : Create a new hike.
     *
     * @param hike the hike to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hike, or with status 400 (Bad Request) if the hike has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hikes")
    @Timed
    public ResponseEntity<Hike> createHike(@RequestBody Hike hike) throws URISyntaxException {
        log.debug("REST request to save Hike : {}", hike);
        if (hike.getId() != null) {
            throw new BadRequestAlertException("A new hike cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hike result = hikeService.save(hike);
        return ResponseEntity.created(new URI("/api/hikes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hikes : Updates an existing hike.
     *
     * @param hike the hike to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hike,
     * or with status 400 (Bad Request) if the hike is not valid,
     * or with status 500 (Internal Server Error) if the hike couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hikes")
    @Timed
    public ResponseEntity<Hike> updateHike(@RequestBody Hike hike) throws URISyntaxException {
        log.debug("REST request to update Hike : {}", hike);
        if (hike.getId() == null) {
            return createHike(hike);
        }
        Hike result = hikeService.save(hike);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hike.getId().toString()))
            .body(result);
    }
    
    /**
     * GET  /hikes : get all the hikes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hikes in body
     */
    @GetMapping("/hikes")
    @Timed
    public ResponseEntity<List<Hike>> getAllHikes(Pageable pageable) {
        log.debug("REST request to get a page of Hikes");
        Page<Hike> page = hikeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hikes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /hikes : get all the hikes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hikes in body
     */
    @GetMapping("/hikes/yourhikes")
    @Timed
    public ResponseEntity<List<Hike>> getAllHikesCurrentUser(Pageable pageable) {
    	Optional <String> userstr = SecurityUtils.getCurrentUserLogin();
    	Optional<User> user = userRepository.findOneByLogin(userstr.get());
    	Hiker userh = hikerRepository.findOneByUser(user.get());
        log.debug("REST request to get a page of Hikes");
        Page<Hike> page = hikeService.findAllByWalkers(pageable, userh);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hikes/yourhikes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /hikes/:id : get the "id" hike.
     *
     * @param id the id of the hike to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hike, or with status 404 (Not Found)
     */
    @GetMapping("/hikes/{id}")
    @Timed
    public ResponseEntity<Hike> getHike(@PathVariable Long id) {
        log.debug("REST request to get Hike : {}", id);
        Hike hike = hikeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hike));
    }

    /**
     * DELETE  /hikes/:id : delete the "id" hike.
     *
     * @param id the id of the hike to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hikes/{id}")
    @Timed
    public ResponseEntity<Void> deleteHike(@PathVariable Long id) {
        log.debug("REST request to delete Hike : {}", id);
        hikeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
