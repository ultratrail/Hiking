package rando.ricm.web.rest;

import com.codahale.metrics.annotation.Timed;
import rando.ricm.web.rest.util.HeaderUtil;
import rando.ricm.web.rest.util.PaginationUtil;
import rando.ricm.web.rest.vm.MyHikesLoadVM;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hikes.
 */
@RestController
@RequestMapping("/api/hikes")
public class HikesResource {

    private final Logger log = LoggerFactory.getLogger(HikesResource.class);

    /**
     * GET  /my-hikes : get My hikes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the myHikesLoadVM, or with status 404 (Not Found)
     */
    @GetMapping("/my-hikes")
    @Timed
    public ResponseEntity<MyHikesLoadVM> getMyHikes() {
        log.debug("REST request to get MyHikesLoadVM");
        MyHikesLoadVM myHikesLoadVM = null;
        //TODO please code the load referential data or any utils data to load the page.
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(myHikesLoadVM));
    }


}
