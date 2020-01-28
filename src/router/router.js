const router = require('express').Router();
const { insertMasterKaryawan, karyawanNoJoin, karyawanJoinOne, karyawanNestedJoin, karyawanGroupByDepartment, karyawanDistinctNPK, contractLastEachEmployee } = require('../modules/master');


router.post('/karyawan', async (req, res) => {
    console.log(req.body);

    const result = await insertMasterKaryawan(req.body);

    res.json(result);
});

router.get('/karyawan/no-join', async (req, res) => {
    console.log(req.query);

    const result = await karyawanNoJoin(req.query);

    res.json(result);
});

router.get('/karyawan/join-one', async (req, res) => {
    console.log(req.query);

    const result = await karyawanJoinOne(req.query);

    res.json(result);
});

router.get('/karyawan/join-nested', async (req, res) => {
    console.log(req.query);

    const result = await karyawanNestedJoin(req.query);

    res.json(result);
});

router.get('/karyawan/group-by', async (req, res) => {
    console.log(req.query);

    const result = await karyawanGroupByDepartment(req.query);

    res.json(result);
});

router.get('/karyawan/distinct-npk', async (req, res) => {
    console.log(req.query);

    const result = await karyawanDistinctNPK(req.query);

    res.json(result);
});


/* MIRZA CHALLENGE */

router.get('/contract/last-each-employee', async (req, res) => {
    console.log(req.query);

    const result = await contractLastEachEmployee(req.query);

    res.json(result);
});
module.exports = router;