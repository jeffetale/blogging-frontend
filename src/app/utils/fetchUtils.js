// src/utils/fetchUtils.js

export const fetchWithTimeout = async (url, options = {}, timeoutMs = 120000) => {  // 120 seconds timeout by default
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Network response was not ok');
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Helper function specifically for blog post submission
export const submitBlogPost = async (backendBaseURL, formData, token, timeoutMs = 60000) => {
  return fetchWithTimeout(
    `${backendBaseURL}/api/v1/blog_posts`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
    timeoutMs
  );
};