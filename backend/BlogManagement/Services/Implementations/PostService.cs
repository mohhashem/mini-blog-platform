using Domain.DTOs;
using Domain.Models;
using Infrastructure.Interfaces;
using Services.Interfaces;

namespace Services.Implementations
{
    public class PostService : IPostService
    {
        private readonly IPostRepo _postRepo;
        public PostService(IPostRepo postRepo)
        {
            _postRepo = postRepo;
        }

        public async Task<List<PostDTO>> GetAllPostsAsync()
        {
            var posts = await _postRepo.GetAllAsync();

            if (posts == null || posts.Count == 0)
                return new List<PostDTO>();

            return posts.Select(p => new PostDTO
            {
                Id = p.id,
                Title = p.title,
                Content = p.content,
                Author = p.author,
                CreatedAt = p.createdAt,
                IsPublished = p.isPublished
            }).ToList();
        }

        public async Task<PostDTO?> GetPostByIdAsync(int id)
        {
            var post = await _postRepo.GetByIdAsync(id);
            if (post == null) return null;

            return new PostDTO
            {
                Id = post.id,
                Title = post.title,
                Content = post.content,
                Author = post.author,
                CreatedAt = post.createdAt,
                IsPublished = post.isPublished
            };
        }

        public async Task<bool> UpdatePostAsync(PostDTO postDto)
        {
            var existing = await _postRepo.GetByIdAsync(postDto.Id);
            if (existing == null) return false;

            existing.title = postDto.Title;
            existing.content = postDto.Content;
            existing.isPublished = postDto.IsPublished;

            return await _postRepo.UpdateAsync(existing);
        }
        public async Task<PostDTO> CreatePostAsync(PostDTO newPost)
        {
            var post = new Post
            {
                title = newPost.Title,
                content = newPost.Content,
                author = newPost.Author,
                createdAt = newPost.CreatedAt,
                isPublished = newPost.IsPublished
            };

            var created = await _postRepo.AddAsync(post);

            return new PostDTO
            {
                Id = created.id,
                Title = created.title,
                Content = created.content,
                Author = created.author,
                CreatedAt = created.createdAt,
                IsPublished = created.isPublished
            };
        }
        public async Task<bool> DeletePostAsync(int id)
        {
            var existing = await _postRepo.GetByIdAsync(id);
            if (existing == null) return false;

            return await _postRepo.DeleteAsync(existing);
        }


    }
}
