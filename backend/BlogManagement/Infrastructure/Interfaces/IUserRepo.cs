using Domain.Models;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IUserRepo
    {
        Task<User> GetUserByUsernameAsync(string userName);

    }
}
