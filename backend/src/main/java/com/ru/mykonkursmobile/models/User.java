package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.enums.TypeUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "profile")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User{
	@Id
	@JsonProperty("idUser")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idUser;

	@NotNull(message = "Выберете тип пользователя")
	@Column(name="type_user")
	@Enumerated(EnumType.STRING)
	private TypeUser typeUser;

	@Column(name="organization_name")
	private String organizationName;

	@Size(min = 12, max = 12, message = "ИНН должен содержать 12 символов")
	@Pattern(regexp = "^[0-9]+$", message = "ИНН должен содержать только цифры")
	@Column(name="inn")
	private String inn;

	@Size(min = 9, max = 9, message = "КПП должен содержать 9 символов")
	@Pattern(regexp = "^[0-9]+$", message = "КПП должен содержать только цифры")
	@Column(name="kpp")
	private String kpp;

	@Column(name="legal_address")
	private String legalAddress;

	@Size(min = 20, max = 20, message = "Р/С должен содержать 20 символов")
	@Pattern(regexp = "^[0-9]+$", message = "Р/С должен содержать только цифры")
	@Column(name="settlement_account")
	private String settlementAccount;

	@Size(min = 9, max = 9, message = "БИК должен содержать 9 символов")
	@Pattern(regexp = "^[0-9]+$", message = "БИК должен содержать только цифры")
	@Column(name="bik_bank")
	private String bikBank;

	@Column(name="with_nds")
	private Boolean withNds;

	@Column(name="surname_user")
	private String surnameUser;


	@Column(name="name_user")
	private String nameUser;

	@Column(name="patronimyc_user")
	private String patronimycUser;

	@NotBlank(message = "Логин обязателен")
	@Size(min = 5, message = "Минимальная длина логина 5 символов")
	@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Логин может содержать только буквы латинского алфавита и цифры")
	@Column(name="login_user")
	private String loginUser;


	@Size(min = 8, message = "Минимальная длина пароля 8 символов")
	@Pattern(regexp = "((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Za-z]).*$", message = "Пароль должен включать буквы латинского алфавита, цифры и хотя бы 1 спец символ")
	@NotBlank(message = "Пароль обязателен")
	@JsonIgnoreProperties
	@Column(name="password_user", nullable = false)
	private String passwordUser;

	@NotBlank(message = "Email обязателен")
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
			+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
	@Column(name="mail_user")
	private String mailUser;

	@Column(name="phone_user")
	private String phoneUser;

	@Column(name="role")
	@Enumerated(EnumType.STRING)
	private Role role;

	public void setIdUser(int idUser){

		this.idUser = idUser;
	}
	public int getIdUser(){

		return this.idUser;
	}

	public TypeUser getTypeUser() {
		return typeUser;
	}

	public void setTypeUser(TypeUser typeUser) {
		this.typeUser = typeUser;
	}

	public void setSurnameUser(String surnameUser){

		this.surnameUser = surnameUser;
	}
	public String getSurnameUser(){

		return this.surnameUser;
	}

	public void setNameUser(String nameUser){

		this.nameUser = nameUser;
	}
	public String getNameUser(){

		return this.nameUser;
	}

	public void setPatronimycUser(String patronimycUser){

		this.patronimycUser = patronimycUser;
	}
	public String getPatronimycUser(){

		return this.patronimycUser;
	}

	public void setLoginUser(String loginUser){
		this.loginUser = loginUser;
	}

	public String getLoginUser(){
		return this.loginUser;
	}

	public void setPasswordUser(String passwordUser){
		this.passwordUser = passwordUser;
	}

	public String getPasswordUser(){
		return this.passwordUser;
	}

	public void setMailUser(String mailUser){

		this.mailUser = mailUser;
	}
	public String getMailUser(){

		return this.mailUser;
	}

	public void setPhoneUser(String phoneUser){

		this.phoneUser = phoneUser;
	}
	public String getPhoneUser(){

		return this.phoneUser;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getInn() {
		return inn;
	}

	public void setInn(String inn) {
		this.inn = inn;
	}

	public String getKpp() {
		return kpp;
	}

	public void setKpp(String kpp) {
		this.kpp = kpp;
	}

	public String getLegalAddress() {
		return legalAddress;
	}

	public void setLegalAddress(String legalAddress) {
		this.legalAddress = legalAddress;
	}

	public String getSettlementAccount() {
		return settlementAccount;
	}

	public void setSettlementAccount(String settlementAccount) {
		this.settlementAccount = settlementAccount;
	}

	public String getBikBank() {
		return bikBank;
	}

	public void setBikBank(String bikBank) {
		this.bikBank = bikBank;
	}

	public Boolean getWithNds() {
		return withNds;
	}

	public void setWithNds(Boolean withNds) {
		this.withNds = withNds;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	public Role getRole(){
		return  this.role;
	}

	public User(
			Integer idUser,
			TypeUser typeUser,
			String surnameUser,
			String nameUser,
			String patronimycUser,
			String loginUser,
			String passwordUser,
			String mailUser,
			String phoneUser,
			Role role,
			String organizationName,
			String inn,
			String kpp,
			String bikBank,
			String legalAddress,
			String settlementAccount,
			Boolean withNds){
		this.idUser = idUser;
		this.typeUser = typeUser;
		this.surnameUser = surnameUser;
		this.nameUser = nameUser;
		this.patronimycUser = patronimycUser;
		this.loginUser = loginUser;
		this.passwordUser = passwordUser;
		this.mailUser = mailUser;
		this.phoneUser = phoneUser;
		this.role = role;
		this.organizationName = organizationName;
		this.bikBank = bikBank;
		this.inn = inn;
		this.kpp = kpp;
		this.legalAddress = legalAddress;
		this.settlementAccount = settlementAccount;
		this.withNds = withNds;
	}

	public User(
				TypeUser typeUser,
				String surnameUser,
				String nameUser,
				String patronimycUser,
				String loginUser,
				String passwordUser,
				String mailUser,
				String phoneUser,
				Role role,
				String organizationName,
				String inn,
				String kpp,
				String bikBank,
				String legalAddress,
				String settlementAccount,
				Boolean withNds){
		this.typeUser = typeUser;
		this.surnameUser = surnameUser;
		this.nameUser = nameUser;
		this.patronimycUser = patronimycUser;
		this.loginUser = loginUser;
		this.passwordUser = passwordUser;
		this.mailUser = mailUser;
		this.phoneUser = phoneUser;
		this.role = role;
		this.organizationName = organizationName;
		this.bikBank = bikBank;
		this.inn = inn;
		this.kpp = kpp;
		this.legalAddress = legalAddress;
		this.settlementAccount = settlementAccount;
		this.withNds = withNds;
	}

	public User(){
	}
}