package rando.ricm.web.rest;

import rando.ricm.HikingApp;

import rando.ricm.domain.Hike;
import rando.ricm.repository.HikeRepository;
import rando.ricm.service.HikeService;
import rando.ricm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static rando.ricm.web.rest.TestUtil.sameInstant;
import static rando.ricm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HikeResource REST controller.
 *
 * @see HikeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HikingApp.class)
public class HikeResourceIntTest {

    private static final String DEFAULT_HIKENAME = "AAAAAAAAAA";
    private static final String UPDATED_HIKENAME = "BBBBBBBBBB";

    private static final String DEFAULT_MEETINGPLACE = "AAAAAAAAAA";
    private static final String UPDATED_MEETINGPLACE = "BBBBBBBBBB";

    private static final Integer DEFAULT_POSITIVEDROP = 1;
    private static final Integer UPDATED_POSITIVEDROP = 2;

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private HikeRepository hikeRepository;

    @Autowired
    private HikeService hikeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHikeMockMvc;

    private Hike hike;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HikeResource hikeResource = new HikeResource(hikeService);
        this.restHikeMockMvc = MockMvcBuilders.standaloneSetup(hikeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hike createEntity(EntityManager em) {
        Hike hike = new Hike()
            .hikename(DEFAULT_HIKENAME)
            .meetingplace(DEFAULT_MEETINGPLACE)
            .positivedrop(DEFAULT_POSITIVEDROP)
            .duration(DEFAULT_DURATION)
            .date(DEFAULT_DATE);
        return hike;
    }

    @Before
    public void initTest() {
        hike = createEntity(em);
    }

    @Test
    @Transactional
    public void createHike() throws Exception {
        int databaseSizeBeforeCreate = hikeRepository.findAll().size();

        // Create the Hike
        restHikeMockMvc.perform(post("/api/hikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hike)))
            .andExpect(status().isCreated());

        // Validate the Hike in the database
        List<Hike> hikeList = hikeRepository.findAll();
        assertThat(hikeList).hasSize(databaseSizeBeforeCreate + 1);
        Hike testHike = hikeList.get(hikeList.size() - 1);
        assertThat(testHike.getHikename()).isEqualTo(DEFAULT_HIKENAME);
        assertThat(testHike.getMeetingplace()).isEqualTo(DEFAULT_MEETINGPLACE);
        assertThat(testHike.getPositivedrop()).isEqualTo(DEFAULT_POSITIVEDROP);
        assertThat(testHike.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testHike.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createHikeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hikeRepository.findAll().size();

        // Create the Hike with an existing ID
        hike.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHikeMockMvc.perform(post("/api/hikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hike)))
            .andExpect(status().isBadRequest());

        // Validate the Hike in the database
        List<Hike> hikeList = hikeRepository.findAll();
        assertThat(hikeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHikes() throws Exception {
        // Initialize the database
        hikeRepository.saveAndFlush(hike);

        // Get all the hikeList
        restHikeMockMvc.perform(get("/api/hikes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hike.getId().intValue())))
            .andExpect(jsonPath("$.[*].hikename").value(hasItem(DEFAULT_HIKENAME.toString())))
            .andExpect(jsonPath("$.[*].meetingplace").value(hasItem(DEFAULT_MEETINGPLACE.toString())))
            .andExpect(jsonPath("$.[*].positivedrop").value(hasItem(DEFAULT_POSITIVEDROP)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getHike() throws Exception {
        // Initialize the database
        hikeRepository.saveAndFlush(hike);

        // Get the hike
        restHikeMockMvc.perform(get("/api/hikes/{id}", hike.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hike.getId().intValue()))
            .andExpect(jsonPath("$.hikename").value(DEFAULT_HIKENAME.toString()))
            .andExpect(jsonPath("$.meetingplace").value(DEFAULT_MEETINGPLACE.toString()))
            .andExpect(jsonPath("$.positivedrop").value(DEFAULT_POSITIVEDROP))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingHike() throws Exception {
        // Get the hike
        restHikeMockMvc.perform(get("/api/hikes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHike() throws Exception {
        // Initialize the database
        hikeService.save(hike);

        int databaseSizeBeforeUpdate = hikeRepository.findAll().size();

        // Update the hike
        Hike updatedHike = hikeRepository.findOne(hike.getId());
        // Disconnect from session so that the updates on updatedHike are not directly saved in db
        em.detach(updatedHike);
        updatedHike
            .hikename(UPDATED_HIKENAME)
            .meetingplace(UPDATED_MEETINGPLACE)
            .positivedrop(UPDATED_POSITIVEDROP)
            .duration(UPDATED_DURATION)
            .date(UPDATED_DATE);

        restHikeMockMvc.perform(put("/api/hikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHike)))
            .andExpect(status().isOk());

        // Validate the Hike in the database
        List<Hike> hikeList = hikeRepository.findAll();
        assertThat(hikeList).hasSize(databaseSizeBeforeUpdate);
        Hike testHike = hikeList.get(hikeList.size() - 1);
        assertThat(testHike.getHikename()).isEqualTo(UPDATED_HIKENAME);
        assertThat(testHike.getMeetingplace()).isEqualTo(UPDATED_MEETINGPLACE);
        assertThat(testHike.getPositivedrop()).isEqualTo(UPDATED_POSITIVEDROP);
        assertThat(testHike.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testHike.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingHike() throws Exception {
        int databaseSizeBeforeUpdate = hikeRepository.findAll().size();

        // Create the Hike

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHikeMockMvc.perform(put("/api/hikes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hike)))
            .andExpect(status().isCreated());

        // Validate the Hike in the database
        List<Hike> hikeList = hikeRepository.findAll();
        assertThat(hikeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHike() throws Exception {
        // Initialize the database
        hikeService.save(hike);

        int databaseSizeBeforeDelete = hikeRepository.findAll().size();

        // Get the hike
        restHikeMockMvc.perform(delete("/api/hikes/{id}", hike.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Hike> hikeList = hikeRepository.findAll();
        assertThat(hikeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hike.class);
        Hike hike1 = new Hike();
        hike1.setId(1L);
        Hike hike2 = new Hike();
        hike2.setId(hike1.getId());
        assertThat(hike1).isEqualTo(hike2);
        hike2.setId(2L);
        assertThat(hike1).isNotEqualTo(hike2);
        hike1.setId(null);
        assertThat(hike1).isNotEqualTo(hike2);
    }
}
