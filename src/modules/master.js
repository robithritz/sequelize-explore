const { MasterKaryawan, MasterDepartment, MasterJabatan, MasterStaffType, ContractType, TableContract } = require('../utils/sequelize-orm');
const { Sequelize } = require('sequelize');


module.exports = {
    insertMasterKaryawan: async (data) => {

        try {
            const values = {
                npk: data.npk,
                name: data.name,
                dept_id: data.dept_id,
                jabatan_id: data.jabatan_id
            };

            const result = await MasterKaryawan.create(values);

            // UPSERT

            // MasterKaryawan.findOne({
            //     where: {
            //         npk: data.npk,
            //         status_id: 1
            //     }
            // }).then(function(obj) {
            //     // update
            //     if(obj)
            //         return obj.update({
            //             status_id: 0
            //         });
            //     // insert
            //     return Model.create(values);
            // })

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },

    karyawanNoJoin: async (data) => {
        try {
            const result = await MasterKaryawan.findOne({
                where: {
                    npk: data.npk,
                    status_id: 1
                }
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },

    karyawanJoinOne: async (data) => {
        try {
            const result = await MasterKaryawan.findOne({
                where: {
                    npk: data.npk,
                    status_id: 1
                },
                include: [{
                    model: MasterDepartment,
                    attributes: ['dept_name'],
                    where: {
                        status_id: 1
                    },
                    required: false
                }]
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },

    karyawanNestedJoin: async (data) => {
        try {
            const result = await MasterKaryawan.findAll({
                raw: true,
                where: {
                    status_id: 1
                },
                attributes: [
                    'id',
                    'npk',
                    'name',
                    'dept_id',
                    'master_department.dept_name',
                    'jabatan_id',
                    'master_jabatan.jabatan_name',
                    [Sequelize.col('master_jabatan.master_staff_type.name'), 'staff_type_name']
                ],
                include: [{
                    model: MasterDepartment,
                    attributes: [],
                    where: {
                        status_id: 1
                    },
                    required: false
                },{
                    model: MasterJabatan,
                    attributes: [],
                    where: {
                        status_id: 1
                    },
                    required: false,
                    include: [{
                        model: MasterStaffType,
                        attributes: [],
                        where: {
                            status_id: 1
                        },
                        required: false
                    }]
                }]
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },

    karyawanGroupByDepartment: async (data) => {
        try {
            const result = await MasterKaryawan.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('master_karyawan.dept_id')), 'total'],
                    [Sequelize.col('master_department.dept_name'), 'deputy']
                ],
                where: {
                    status_id: 1
                },
                include: [{
                    model: MasterDepartment,
                    attributes: [],
                    where: {
                        status_id: 1
                    },
                    required: false
                }],
                group: ['master_karyawan.dept_id', 'master_department.dept_name']
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },

    karyawanDistinctNPK: async (data) => {
        try {
            const result = await MasterKaryawan.findAll({
                raw: true,
                attributes: [
                    Sequelize.literal(`DISTINCT ON("npk") npk`),
                    'name',
                ],
                where: {
                    status_id: 1
                },
                include: [{
                    model: MasterDepartment,
                    attributes: [],
                    where: {
                        status_id: 1
                    },
                    required: false
                }],
                order: [[Sequelize.literal('npk')], ['created_at', 'DESC']]
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    },



    /* MIRZA CHALLENGE*/

    contractLastEachEmployee: async (data) => {
        try {
            const result = await TableContract.findAll({
                raw: true,
                attributes: [
                    Sequelize.literal(`DISTINCT ON(nama) nama`),
                    'id_contract',
                    'start_date',
                    'end_date',
                    'type_id',
                    [Sequelize.col('mirza_contract_type.name'), 'type_name']
                ],
                where: {
                    status_id: 1,
                    '$mirza_contract_type.type_id$': 1
                },
                include: [{
                    model: ContractType,
                    attributes: [],
                    
                }],
                order: [[Sequelize.col('nama')], ['start_date', 'DESC']]
            });

            return { status: 1,result: result }; 
        }catch(err) {
            console.log(err);
            return { status: -1 };
        }
    }
}