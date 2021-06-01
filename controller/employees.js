const Employee = require('../models/employees');
const EmpDept = require('../models/employeeDepartment');
const EmpRole = require('../models/employeeRole')
const bcrypt = require('bcrypt');
const loginConstants =  require('../constants/login.constants');

exports.getAllEmployees = (req, resp, next) => {
    Employee.findAll()
        .then(employees => {
            resp.status(200).json({
                message: 'Employees retrieved successfully',
                employees: employees
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employees not found'
            });
        });
};

exports.getEmployee = (req, resp, next) => {
    const empId = req.params.id;
    Employee.findByPk(empId)
        .then(employee => {
            resp.status(200).json({
                employee
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee not found'
            });
        })
};

exports.getEmployeeDepartments = (req, resp, next) => {
    const empId = req.params.id;
    EmpDept.findAll({
        attributes: ['deptId'],
        where: { empId: empId }
    })
        .then(employeeDepartments => {
            resp.status(200).json({
                employeeDepartments
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Departments not found'
            })
        });
};

exports.postEmployee = (req, resp, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, loginConstants.salt);
    const addrId = req.body.addrId;
    Employee.create({
        name: name,
        age: age,
        username,
        password,
        addrId
    }).then(employee => {
        resp.status(200).json({
            message: 'Employee created successfully',
            employee
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Employee creation failed'
        });
    });
};

exports.postEmployeeDepartment = (req, resp, next) => {
    const empId = req.params.id;
    const deptId = req.body.deptId;

    EmpDept.create({
        empId: empId,
        deptId: deptId
    }).then(employeeDepartment => {
        resp.status(200).json({
            message: `Department ${employeeDepartment.deptId} added for employee ${employeeDepartment.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};

exports.editEmployee = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const isActive = req.body.isActive;
    Employee.findByPk(id)
        .then(employee => {
            employee.name = name,
            employee.age = age,
            employee.isActive = isActive
            return employee.save();
        })
        .then(employee => {
            resp.status(200).json({
                message: 'Employee updated successfully',
                employee
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee updation failed'
            });
        });
};

exports.deleteEmployee = (req, resp, next) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then(employee => {
            return employee.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Employee deleted successfully'
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee deletion failed'
            });
        });
};

exports.getEmployeeRoles = (req, resp, next) => {
    const empId = req.params.id;
    EmpRole.findAll({
        attributes: ['roleId'],
        where: { empId: empId }
    })
        .then(employeeRoles => {
            resp.status(200).json({
                employeeRoles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Role not found'
            })
        });
};

exports.postEmployeeRole = (req, resp, next) => {
    const empId = req.params.id;
    const roleId = req.body.roleId;

    EmpRole.create({
        empId: empId,
        roleId: roleId
    }).then(employeeRoles => {
        resp.status(200).json({
            message: '`Role ${employeeRoles.empId} added for employee ${employeeRoles.roleId`'
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding role for employee failed'
        });
    });
};

exports.deleteEmployeeRole = (req,resp,next) => {
  const empId = req.body.empId;
  const roleId = req.body.roleId;

  EmpRole.findAll({
    where:{empId : empId,roleId:roleId}
  })
  .then(role => {
      console.log("here")
      return role[0].destroy();
  })
  .then(()=> {
    resp.status(200).json({
        message: 'roles deleted successfully'
      })
  })
  .catch(err =>{
    resp.status(404).json({
      message:'roles couldnt be deleted'
    })
  })
}
