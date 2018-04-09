package rando.ricm.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "360")
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "360")
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @NotNull
    @Column(name = "datetime", nullable = false)
    private ZonedDateTime datetime;

    @NotNull
    @Column(name = "sos", nullable = false)
    private Boolean sos;

    @NotNull
    @Column(name = "esp_on", nullable = false)
    private Boolean espON;

    @Column(name = "heartrate")
    private Integer heartrate;

    @ManyToOne
    private Hiker sender;

    @ManyToOne
    private Hike hike;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Message longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Message latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public ZonedDateTime getDatetime() {
        return datetime;
    }

    public Message datetime(ZonedDateTime datetime) {
        this.datetime = datetime;
        return this;
    }

    public void setDatetime(ZonedDateTime datetime) {
        this.datetime = datetime;
    }

    public Boolean isSos() {
        return sos;
    }

    public Message sos(Boolean sos) {
        this.sos = sos;
        return this;
    }

    public void setSos(Boolean sos) {
        this.sos = sos;
    }

    public Boolean isEspON() {
        return espON;
    }

    public Message espON(Boolean espON) {
        this.espON = espON;
        return this;
    }

    public void setEspON(Boolean espON) {
        this.espON = espON;
    }

    public Integer getHeartrate() {
        return heartrate;
    }

    public Message heartrate(Integer heartrate) {
        this.heartrate = heartrate;
        return this;
    }

    public void setHeartrate(Integer heartrate) {
        this.heartrate = heartrate;
    }

    public Hiker getSender() {
        return sender;
    }

    public Message sender(Hiker hiker) {
        this.sender = hiker;
        return this;
    }

    public void setSender(Hiker hiker) {
        this.sender = hiker;
    }

    public Hike getHike() {
        return hike;
    }

    public Message hike(Hike hike) {
        this.hike = hike;
        return this;
    }

    public void setHike(Hike hike) {
        this.hike = hike;
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
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", longitude=" + getLongitude() +
            ", latitude=" + getLatitude() +
            ", datetime='" + getDatetime() + "'" +
            ", sos='" + isSos() + "'" +
            ", espON='" + isEspON() + "'" +
            ", heartrate=" + getHeartrate() +
            "}";
    }
}
