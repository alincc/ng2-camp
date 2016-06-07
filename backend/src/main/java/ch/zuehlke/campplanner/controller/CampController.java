package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.CampRepository;
import ch.zuehlke.campplanner.domain.Camp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/camps")
public class CampController {

    @Autowired
    private CampRepository campRepository;

    @Transactional
    @RequestMapping
    public List<Camp> getAll() {
        List<Camp> camps = new LinkedList<>();
        campRepository.findAll().forEach(camps::add);
        return camps;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Camp get(@PathVariable("id") Long id) {
        return campRepository.findOne(id);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public Camp addOrUpdate(@RequestBody Camp camp) {
        campRepository.save(camp);
        return camp;
    }
}
