/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dto;

import java.io.InputStream;

/**
 *
 * @author Shrasti
 */
public class CandidateDTO {

    private String candidateId;
    private String party;
    private String city;
    private String userId;
    private InputStream symbol;
    private String cname;

    @Override
    public String toString() {
        return "AddCandidateDto{" + "candidateId=" + candidateId + ", party=" + party + ", city=" + city + ", userId=" + userId + '}';
    }

    public CandidateDTO() {

    }

    public CandidateDTO(String candidateId, String party, String city, String userId, InputStream symbol,String cname) {
        this.candidateId = candidateId;
        this.party = party;
        this.city = city;
        this.userId = userId;
        this.symbol = symbol;
        this.cname=cname;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public InputStream getSymbol() {
        return symbol;
    }

    public void setSymbol(InputStream symbol) {
        this.symbol = symbol;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }
    
}

    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    

