const router = require('express').Router();
const { insertMasterKaryawan, karyawanNoJoin, karyawanJoinOne, karyawanNestedJoin } = require('../modules/master');


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

module.exports = router;