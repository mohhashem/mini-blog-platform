using Domain.Models;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infrastructure.Implementations
{
    public class UserRepo : IUserRepo
    {
        private readonly BlogDbContext _context;

        public UserRepo(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByUsernameAsync(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.userName == userName);
        }

    }
}
