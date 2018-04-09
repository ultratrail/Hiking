package rando.ricm.web.rest.vm;

import rando.ricm.service.dto.UserDTO;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import rando.ricm.domain.enumeration.Sex;
/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;
    
    private String firstname;
    
    private String name;
    
    private Sex sex;
    
    private LocalDate birthdate;
    
    private String phonenumber;
    
    private int anaerobicmaximumspeed;
    
    private int weight;
    
    //private ZonedDateTime realbirthdate;

    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    

    public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	
	
	public LocalDate getBirthdate() {
		System.out.println("--------------------- date - "+ birthdate.toString());
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	/*public LocalDate getRealbirthdate() {
		return LocalDate.parse(this.getBirthdate()+ "T00:00:00+01:00[Europe/Paris]");
	}
*/
	

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public int getAnaerobicmaximumspeed() {
		return anaerobicmaximumspeed;
	}

	public void setAnaerobicmaximumspeed(int anaerobicmaximumspeed) {
		this.anaerobicmaximumspeed = anaerobicmaximumspeed;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	@Override
    public String toString() {
        return "ManagedUserVM{" + "ManagedUserVM [password=" + password + ", firstname=" + firstname + ", name=" + name + ", sex=" + sex.toString()
				+ ", birthdate=" + birthdate +"]"+
            "} " + super.toString();
    }
	
	
}
