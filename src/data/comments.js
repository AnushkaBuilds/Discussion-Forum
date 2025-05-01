export const discussionData = [
  {
    id: '1',
    content: "I found an O(n) solution using a hashmap to store the complement of each number.",
    createdAt: "2023-11-15T14:32:00Z",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    upvotes: 42,
    replies: [
      {
        id: '2',
        content: "That's a great approach! Can you share your code?",
        createdAt: "2023-11-15T15:10:00Z",
        author: {
          id: "user2",
          name: "Sophia Chen",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        upvotes: 12,
        replies: [
          {
            id: '3',
            content: "Here's my solution:",
            createdAt: "2023-11-15T15:30:00Z",
            author: {
              id: "user1",
              name: "Alex Johnson",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            upvotes: 28,
            codeSnippet: {
              language: "javascript",
              code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
            },
            replies: []
          },
          {
            id: '4',
            content: "Thanks for sharing! This is much cleaner than my approach.",
            createdAt: "2023-11-15T16:05:00Z",
            author: {
              id: "user2",
              name: "Sophia Chen",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            upvotes: 7,
            replies: []
          }
        ]
      },
      {
        id: '5',
        content: "I tried the same approach but got TLE on large inputs. Any optimization tips?",
        createdAt: "2023-11-15T17:22:00Z",
        author: {
          id: "user3",
          name: "Marcus Kim",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        upvotes: 5,
        replies: [
          {
            id: '6',
            content: "Make sure you're using a hashmap and not doing a nested loop. The lookup should be O(1).",
            createdAt: "2023-11-15T17:45:00Z",
            author: {
              id: "user4",
              name: "Priya Sharma",
              avatar: "https://randomuser.me/api/portraits/women/67.jpg"
            },
            upvotes: 19,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: '7',
    content: "Can we solve this with a two-pointer approach if the array is sorted?",
    createdAt: "2023-11-16T09:15:00Z",
    author: {
      id: "user5",
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    upvotes: 31,
    replies: [
      {
        id: '8',
        content: "Yes, that's a valid approach if the array is sorted. Just need to be careful about returning the original indices if you sort the array.",
        createdAt: "2023-11-16T10:02:00Z",
        author: {
          id: "user6",
          name: "Emma Thompson",
          avatar: "https://randomuser.me/api/portraits/women/33.jpg"
        },
        upvotes: 24,
        codeSnippet: {
          language: "python",
          code: "def twoSum(nums, target):\n    # Create array of (number, index) pairs\n    pairs = [(nums[i], i) for i in range(len(nums))]\n    # Sort based on numbers\n    pairs.sort()\n    left, right = 0, len(nums) - 1\n    \n    while left < right:\n        curr_sum = pairs[left][0] + pairs[right][0]\n        if curr_sum == target:\n            return [pairs[left][1], pairs[right][1]]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    \n    return []"
        },
        replies: []
      }
    ]
  },
  {
    id: '9',
    content: "Is there a way to solve this without using extra space?",
    createdAt: "2023-11-16T14:30:00Z",
    author: {
      id: "user7",
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    upvotes: 8,
    replies: [
      {
        id: '10',
        content: "Not really. The hashmap approach is O(n) time and O(n) space, which is optimal. You could do a brute force approach with nested loops for O(1) space, but that would be O(n²) time.",
        createdAt: "2023-11-16T15:12:00Z",
        author: {
          id: "user8",
          name: "Olivia Parker",
          avatar: "https://randomuser.me/api/portraits/women/23.jpg"
        },
        upvotes: 15,
        replies: []
      }
    ]
  }
];