using Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IPostRepo
    {
        Task<List<Post>> GetAllAsync();
        Task<Post?> GetByIdAsync(int id);
        Task<bool> UpdateAsync(Post post);
        Task<Post> AddAsync(Post post);
        Task<bool> DeleteAsync(Post post);


    }
}
