const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'sequelize-explore-db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123',
    dialect: 'postgres'
  });

const MasterKaryawan = sequelize.define('master_karyawan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    npk: DataTypes.STRING(100),
    name: DataTypes.STRING(100),
    dept_id: DataTypes.INTEGER,
    jabatan_id: DataTypes.INTEGER,
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }

}, { freezeTableName: true, timestamps: false });

const MasterDepartment = sequelize.define('master_department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dept_id: DataTypes.INTEGER,
    dept_name: DataTypes.STRING,
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }

}, { freezeTableName: true, timestamps: false });

const MasterJabatan = sequelize.define('master_jabatan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jabatan_id: DataTypes.INTEGER,
    jabatan_name: DataTypes.STRING,
    staff_type_id: DataTypes.INTEGER,
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }

}, { freezeTableName: true, timestamps: false });

const MasterStaffType = sequelize.define('master_staff_type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }

}, { freezeTableName: true, timestamps: false });


MasterKaryawan.hasOne(MasterDepartment, {
    foreignKey: 'dept_id',
    sourceKey: 'dept_id'
})

MasterKaryawan.hasOne(MasterJabatan, {
    foreignKey: 'jabatan_id',
    sourceKey: 'jabatan_id'
});

MasterJabatan.hasOne(MasterStaffType, {
    sourceKey: 'staff_type_id',
    foreignKey: 'type_id'
})


async function initializeDB() {
    return await sequelize.sync();
}

module.exports = {
    initializeDB: initializeDB,
    MasterKaryawan: MasterKaryawan,
    MasterDepartment: MasterDepartment,
    MasterJabatan: MasterJabatan,
    MasterStaffType: MasterStaffType
}