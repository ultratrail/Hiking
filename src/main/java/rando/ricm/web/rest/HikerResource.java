package rando.ricm.web.rest;

import com.codahale.metrics.annotation.Timed;
import rando.ricm.domain.Hiker;
import rando.ricm.service.HikerService;
import rando.ricm.web.rest.errors.BadRequestAlertException;
import rando.ricm.web.rest.util.HeaderUtil;
import rando.ricm.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hiker.
 */
@RestController
@RequestMapping("/api")
public class HikerResource {

    private final Logger log = LoggerFactory.getLogger(HikerResource.class);

    private static final String ENTITY_NAME = "hiker";

    private final HikerService hikerService;

    public HikerResource(HikerService hikerService) {
        this.hikerService = hikerService;
    }

    /**
     * POST  /hikers : Create a new hiker.
     *
     * @param hiker the hiker to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hiker, or with status 400 (Bad Request) if the hiker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hikers")
    @Timed
    public ResponseEntity<Hiker> createHiker(@Valid @RequestBody Hiker hiker) throws URISyntaxException {
        log.debug("REST request to save Hiker : {}", hiker);
        if (hiker.getId() != null) {
            throw new BadRequestAlertException("A new hiker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hiker result = hikerService.save(hiker);
        return ResponseEntity.created(new URI("/api/hikers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hikers : Updates an existing hiker.
     *
     * @param hiker the hiker to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hiker,
     * or with status 400 (Bad Request) if the hiker is not valid,
     * or with status 500 (Internal Server Error) if the hiker couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hikers")
    @Timed
    public ResponseEntity<Hiker> updateHiker(@Valid @RequestBody Hiker hiker) throws URISyntaxException {
        log.debug("REST request to update Hiker : {}", hiker);
        if (hiker.getId() == null) {
            return createHiker(hiker);
        }
        Hiker result = hikerService.save(hiker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hiker.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hikers : get all the hikers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hikers in body
     */
    @GetMapping("/hikers")
    @Timed
    public ResponseEntity<List<Hiker>> getAllHikers(Pageable pageable) {
        log.debug("REST request to get a page of Hikers");
        Page<Hiker> page = hikerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hikers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /hikers/:id : get the "id" hiker.
     *
     * @param id the id of the hiker to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hiker, or with status 404 (Not Found)
     */
    @GetMapping("/hikers/{id}")
    @Timed
    public ResponseEntity<Hiker> getHiker(@PathVariable Long id) {
        log.debug("REST request to get Hiker : {}", id);
        Hiker hiker = hikerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hiker));
    }

    /**
     * DELETE  /hikers/:id : delete the "id" hiker.
     *
     * @param id the id of the hiker to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hikers/{id}")
    @Timed
    public ResponseEntity<Void> deleteHiker(@PathVariable Long id) {
        log.debug("REST request to delete Hiker : {}", id);
        hikerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
