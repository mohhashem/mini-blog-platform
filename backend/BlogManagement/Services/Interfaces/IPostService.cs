using Domain.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IPostService
    {
        Task<List<PostDTO>> GetAllPostsAsync();
        Task<PostDTO?> GetPostByIdAsync(int id);
        Task<bool> UpdatePostAsync(PostDTO post);
        Task<bool> DeletePostAsync(int id);
        Task<PostDTO> CreatePostAsync(PostDTO newPost);

    }
}
