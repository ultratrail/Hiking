package rando.ricm.web.rest;

import rando.ricm.HikingApp;

import rando.ricm.domain.Hiker;
import rando.ricm.repository.HikerRepository;
import rando.ricm.service.HikerService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static rando.ricm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import rando.ricm.domain.enumeration.Sex;
/**
 * Test class for the HikerResource REST controller.
 *
 * @see HikerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HikingApp.class)
public class HikerResourceIntTest {

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.MAN;
    private static final Sex UPDATED_SEX = Sex.WOMAN;

    private static final LocalDate DEFAULT_BIRTHDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONENUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONENUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_ANAEROBICMAXIMUMSPEED = 1;
    private static final Integer UPDATED_ANAEROBICMAXIMUMSPEED = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    @Autowired
    private HikerRepository hikerRepository;

    @Autowired
    private HikerService hikerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHikerMockMvc;

    private Hiker hiker;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HikerResource hikerResource = new HikerResource(hikerService);
        this.restHikerMockMvc = MockMvcBuilders.standaloneSetup(hikerResource)
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
    public static Hiker createEntity(EntityManager em) {
        Hiker hiker = new Hiker()
            .firstname(DEFAULT_FIRSTNAME)
            .name(DEFAULT_NAME)
            .sex(DEFAULT_SEX)
            .birthdate(DEFAULT_BIRTHDATE)
            .phonenumber(DEFAULT_PHONENUMBER)
            .anaerobicmaximumspeed(DEFAULT_ANAEROBICMAXIMUMSPEED)
            .weight(DEFAULT_WEIGHT);
        return hiker;
    }

    @Before
    public void initTest() {
        hiker = createEntity(em);
    }

    @Test
    @Transactional
    public void createHiker() throws Exception {
        int databaseSizeBeforeCreate = hikerRepository.findAll().size();

        // Create the Hiker
        restHikerMockMvc.perform(post("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hiker)))
            .andExpect(status().isCreated());

        // Validate the Hiker in the database
        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeCreate + 1);
        Hiker testHiker = hikerList.get(hikerList.size() - 1);
        assertThat(testHiker.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testHiker.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testHiker.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testHiker.getBirthdate()).isEqualTo(DEFAULT_BIRTHDATE);
        assertThat(testHiker.getPhonenumber()).isEqualTo(DEFAULT_PHONENUMBER);
        assertThat(testHiker.getAnaerobicmaximumspeed()).isEqualTo(DEFAULT_ANAEROBICMAXIMUMSPEED);
        assertThat(testHiker.getWeight()).isEqualTo(DEFAULT_WEIGHT);
    }

    @Test
    @Transactional
    public void createHikerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hikerRepository.findAll().size();

        // Create the Hiker with an existing ID
        hiker.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHikerMockMvc.perform(post("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hiker)))
            .andExpect(status().isBadRequest());

        // Validate the Hiker in the database
        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFirstnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = hikerRepository.findAll().size();
        // set the field null
        hiker.setFirstname(null);

        // Create the Hiker, which fails.

        restHikerMockMvc.perform(post("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hiker)))
            .andExpect(status().isBadRequest());

        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = hikerRepository.findAll().size();
        // set the field null
        hiker.setName(null);

        // Create the Hiker, which fails.

        restHikerMockMvc.perform(post("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hiker)))
            .andExpect(status().isBadRequest());

        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHikers() throws Exception {
        // Initialize the database
        hikerRepository.saveAndFlush(hiker);

        // Get all the hikerList
        restHikerMockMvc.perform(get("/api/hikers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hiker.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].birthdate").value(hasItem(DEFAULT_BIRTHDATE.toString())))
            .andExpect(jsonPath("$.[*].phonenumber").value(hasItem(DEFAULT_PHONENUMBER.toString())))
            .andExpect(jsonPath("$.[*].anaerobicmaximumspeed").value(hasItem(DEFAULT_ANAEROBICMAXIMUMSPEED)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)));
    }

    @Test
    @Transactional
    public void getHiker() throws Exception {
        // Initialize the database
        hikerRepository.saveAndFlush(hiker);

        // Get the hiker
        restHikerMockMvc.perform(get("/api/hikers/{id}", hiker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hiker.getId().intValue()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.birthdate").value(DEFAULT_BIRTHDATE.toString()))
            .andExpect(jsonPath("$.phonenumber").value(DEFAULT_PHONENUMBER.toString()))
            .andExpect(jsonPath("$.anaerobicmaximumspeed").value(DEFAULT_ANAEROBICMAXIMUMSPEED))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT));
    }

    @Test
    @Transactional
    public void getNonExistingHiker() throws Exception {
        // Get the hiker
        restHikerMockMvc.perform(get("/api/hikers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHiker() throws Exception {
        // Initialize the database
        hikerService.save(hiker);

        int databaseSizeBeforeUpdate = hikerRepository.findAll().size();

        // Update the hiker
        Hiker updatedHiker = hikerRepository.findOne(hiker.getId());
        // Disconnect from session so that the updates on updatedHiker are not directly saved in db
        em.detach(updatedHiker);
        updatedHiker
            .firstname(UPDATED_FIRSTNAME)
            .name(UPDATED_NAME)
            .sex(UPDATED_SEX)
            .birthdate(UPDATED_BIRTHDATE)
            .phonenumber(UPDATED_PHONENUMBER)
            .anaerobicmaximumspeed(UPDATED_ANAEROBICMAXIMUMSPEED)
            .weight(UPDATED_WEIGHT);

        restHikerMockMvc.perform(put("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHiker)))
            .andExpect(status().isOk());

        // Validate the Hiker in the database
        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeUpdate);
        Hiker testHiker = hikerList.get(hikerList.size() - 1);
        assertThat(testHiker.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testHiker.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testHiker.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testHiker.getBirthdate()).isEqualTo(UPDATED_BIRTHDATE);
        assertThat(testHiker.getPhonenumber()).isEqualTo(UPDATED_PHONENUMBER);
        assertThat(testHiker.getAnaerobicmaximumspeed()).isEqualTo(UPDATED_ANAEROBICMAXIMUMSPEED);
        assertThat(testHiker.getWeight()).isEqualTo(UPDATED_WEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingHiker() throws Exception {
        int databaseSizeBeforeUpdate = hikerRepository.findAll().size();

        // Create the Hiker

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHikerMockMvc.perform(put("/api/hikers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hiker)))
            .andExpect(status().isCreated());

        // Validate the Hiker in the database
        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHiker() throws Exception {
        // Initialize the database
        hikerService.save(hiker);

        int databaseSizeBeforeDelete = hikerRepository.findAll().size();

        // Get the hiker
        restHikerMockMvc.perform(delete("/api/hikers/{id}", hiker.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Hiker> hikerList = hikerRepository.findAll();
        assertThat(hikerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hiker.class);
        Hiker hiker1 = new Hiker();
        hiker1.setId(1L);
        Hiker hiker2 = new Hiker();
        hiker2.setId(hiker1.getId());
        assertThat(hiker1).isEqualTo(hiker2);
        hiker2.setId(2L);
        assertThat(hiker1).isNotEqualTo(hiker2);
        hiker1.setId(null);
        assertThat(hiker1).isNotEqualTo(hiker2);
    }
}
