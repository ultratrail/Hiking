package rando.ricm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Hike.
 */
@Entity
@Table(name = "hike")
public class Hike implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hikename")
    private String hikename;

    @Column(name = "meetingplace")
    private String meetingplace;

    @Column(name = "positivedrop")
    private Integer positivedrop;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @OneToMany(mappedBy = "hike")
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    @ManyToMany(mappedBy = "itineraries")
    @JsonIgnore
    private Set<Hiker> walkers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHikename() {
        return hikename;
    }

    public Hike hikename(String hikename) {
        this.hikename = hikename;
        return this;
    }

    public void setHikename(String hikename) {
        this.hikename = hikename;
    }

    public String getMeetingplace() {
        return meetingplace;
    }

    public Hike meetingplace(String meetingplace) {
        this.meetingplace = meetingplace;
        return this;
    }

    public void setMeetingplace(String meetingplace) {
        this.meetingplace = meetingplace;
    }

    public Integer getPositivedrop() {
        return positivedrop;
    }

    public Hike positivedrop(Integer positivedrop) {
        this.positivedrop = positivedrop;
        return this;
    }

    public void setPositivedrop(Integer positivedrop) {
        this.positivedrop = positivedrop;
    }

    public Integer getDuration() {
        return duration;
    }

    public Hike duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Hike date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Hike messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Hike addMessage(Message message) {
        this.messages.add(message);
        message.setHike(this);
        return this;
    }

    public Hike removeMessage(Message message) {
        this.messages.remove(message);
        message.setHike(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<Hiker> getWalkers() {
        return walkers;
    }

    public Hike walkers(Set<Hiker> hikers) {
        this.walkers = hikers;
        return this;
    }

    public Hike addWalker(Hiker hiker) {
        this.walkers.add(hiker);
        hiker.getItineraries().add(this);
        return this;
    }

    public Hike removeWalker(Hiker hiker) {
        this.walkers.remove(hiker);
        hiker.getItineraries().remove(this);
        return this;
    }

    public void setWalkers(Set<Hiker> hikers) {
        this.walkers = hikers;
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
        Hike hike = (Hike) o;
        if (hike.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hike.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hike{" +
            "id=" + getId() +
            ", hikename='" + getHikename() + "'" +
            ", meetingplace='" + getMeetingplace() + "'" +
            ", positivedrop=" + getPositivedrop() +
            ", duration=" + getDuration() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
