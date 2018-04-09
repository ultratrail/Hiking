package rando.ricm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import rando.ricm.domain.enumeration.Sex;

/**
 * A Hiker.
 */
@Entity
@Table(name = "hiker")
public class Hiker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "phonenumber")
    private String phonenumber;

    @Column(name = "anaerobicmaximumspeed")
    private Integer anaerobicmaximumspeed;

    @Column(name = "weight")
    private Integer weight;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private Set<Message> positions = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "hiker_itinerary",
               joinColumns = @JoinColumn(name="hikers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="itineraries_id", referencedColumnName="id"))
    private Set<Hike> itineraries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public Hiker firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getName() {
        return name;
    }

    public Hiker name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sex getSex() {
        return sex;
    }

    public Hiker sex(Sex sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public Hiker birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public Hiker phonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
        return this;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Integer getAnaerobicmaximumspeed() {
        return anaerobicmaximumspeed;
    }

    public Hiker anaerobicmaximumspeed(Integer anaerobicmaximumspeed) {
        this.anaerobicmaximumspeed = anaerobicmaximumspeed;
        return this;
    }

    public void setAnaerobicmaximumspeed(Integer anaerobicmaximumspeed) {
        this.anaerobicmaximumspeed = anaerobicmaximumspeed;
    }

    public Integer getWeight() {
        return weight;
    }

    public Hiker weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public User getUser() {
        return user;
    }

    public Hiker user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Message> getPositions() {
        return positions;
    }

    public Hiker positions(Set<Message> messages) {
        this.positions = messages;
        return this;
    }

    public Hiker addPosition(Message message) {
        this.positions.add(message);
        message.setSender(this);
        return this;
    }

    public Hiker removePosition(Message message) {
        this.positions.remove(message);
        message.setSender(null);
        return this;
    }

    public void setPositions(Set<Message> messages) {
        this.positions = messages;
    }

    public Set<Hike> getItineraries() {
        return itineraries;
    }

    public Hiker itineraries(Set<Hike> hikes) {
        this.itineraries = hikes;
        return this;
    }

    public Hiker addItinerary(Hike hike) {
        this.itineraries.add(hike);
        hike.getWalkers().add(this);
        return this;
    }

    public Hiker removeItinerary(Hike hike) {
        this.itineraries.remove(hike);
        hike.getWalkers().remove(this);
        return this;
    }

    public void setItineraries(Set<Hike> hikes) {
        this.itineraries = hikes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Hiker hiker = (Hiker) o;
        if (hiker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hiker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hiker{" +
            "id=" + getId() +
            ", firstname='" + getFirstname() + "'" +
            ", name='" + getName() + "'" +
            ", sex='" + getSex() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", phonenumber='" + getPhonenumber() + "'" +
            ", anaerobicmaximumspeed=" + getAnaerobicmaximumspeed() +
            ", weight=" + getWeight() +
            "}";
    }
}
