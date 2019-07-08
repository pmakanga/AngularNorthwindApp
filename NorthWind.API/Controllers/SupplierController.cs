using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthWind.API.DTOs;
using NorthWind.API.Models;
using NorthWind.API.Repositories;

namespace NorthWind.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly NORTHWNDContext _context;
        private readonly IMapper _mapper;
        private readonly IDataRepository<Suppliers> _repo;

        public SupplierController(NORTHWNDContext context, IMapper mapper, IDataRepository<Suppliers> repo)
        {
            _repo = repo;
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Supplier
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suppliers>>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        // GET: api/Supplier/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Suppliers>> GetSuppliers([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var suppliers = await _context.Suppliers.FindAsync(id);


            if (suppliers == null)
            {
                return NotFound();
            }

            return suppliers;
        }


        // POST: api/Supplier
        [HttpPost]
        public async Task<ActionResult> PostSuppliers([FromBody] AddSupplierDTO addSupplierDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var preSupplier = _mapper.Map<Suppliers>(addSupplierDto);
            _repo.Add(preSupplier);
            var saveSupplier = await _repo.SaveAsync(preSupplier);
            var supplierResponse = _mapper.Map<SupplierResponseDTO>(saveSupplier);

            return StatusCode(201, new { supplierResponse });
        
        }



        // PUT: api/Supplier/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuppliers([FromRoute] int id, [FromBody] EditSupplierDTO editSupplierDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != editSupplierDto.SupplierId)
            {
                return BadRequest();
            }

            var preSupplier = _mapper.Map<Suppliers>(editSupplierDto);
            _repo.Update(preSupplier);
            await _repo.SaveAsync(preSupplier);
            var supplierResponse = _mapper.Map<SupplierResponseDTO>(preSupplier);
            
            return StatusCode(201, new {supplierResponse});
        }

        // DELETE: api/Supplier/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuppliers([FromRoute] int id)
        {
             if (!ModelState.IsValid)
             {
                return BadRequest(ModelState);
             }

             var suppliers = await _context.Suppliers.FindAsync(id);

             if (suppliers == null)
             {
                return NotFound();
             }

                 _context.Database.ExecuteSqlCommand("DELETE FROM [Order Details] WHERE ProductID IN (SELECT ProductID FROM Products WHERE SupplierID = @supplierId)",
                new SqlParameter("@supplierId", suppliers.SupplierId));

                _context.Database.ExecuteSqlCommand("DELETE FROM Products WHERE SupplierID = @supplierId",
                new SqlParameter("@supplierId", suppliers.SupplierId));

                   _context.Suppliers.Remove(suppliers);
                await _context.SaveChangesAsync();

                return Ok(suppliers);


        }

        private bool SuppliersExists(int id)
        {
            return _context.Suppliers.Any(e => e.SupplierId == id);
        }
    }
}
