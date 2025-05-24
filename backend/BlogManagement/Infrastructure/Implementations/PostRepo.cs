using Domain.Models;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace Infrastructure.Implementations
{
    public class PostRepo : IPostRepo
    {
        private readonly BlogDbContext _context;

        public PostRepo(BlogDbContext context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetAllAsync()
        {
            return await _context.Blogs.ToListAsync();
        }

        public async Task<Post?> GetByIdAsync(int id)
        {
            return await _context.Blogs.FirstOrDefaultAsync(b => b.id == id);
        }
        public async Task<bool> UpdateAsync(Post post)
        {
            _context.Blogs.Update(post);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Post> AddAsync(Post post)
        {
            await _context.Blogs.AddAsync(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<bool> DeleteAsync(Post post)
        {
            _context.Blogs.Remove(post);
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
