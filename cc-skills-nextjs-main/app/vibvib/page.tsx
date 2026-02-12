'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function VibVibLanding() {
  const [currentVideo, setCurrentVideo] = useState(1);
  const totalVideos = 24;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev % totalVideos) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredVideos = [1, 5, 9, 13, 17, 21];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-6 right-6 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl">
              V
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              VibVib
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors cursor-pointer">功能</a>
            <a href="#showcase" className="text-white/80 hover:text-white transition-colors cursor-pointer">案例</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors cursor-pointer">价格</a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
              开始创作
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10">
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-medium">
                ✨ AI 驱动的视频创作平台
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                用 AI 让你的
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  创意动起来
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                只需输入文字描述，VibVib 就能为你生成专业级的视频内容。
                无需拍摄，无需剪辑，让 AI 成为你的视频制作团队。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer">
                  免费开始创作
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all cursor-pointer">
                  观看演示
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-white/60 text-sm">创作者</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold">2M+</div>
                  <div className="text-white/60 text-sm">生成视频</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-white/60 text-sm">用户评分</div>
                </div>
              </div>
            </div>

            {/* Right Video Showcase */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Main Video Display */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <video
                    key={currentVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={`/video-${currentVideo}.mp4`} type="video/mp4" />
                  </video>
                  
                  {/* Video Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">AI 实时生成中...</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">高质量输出</div>
                      <div className="text-xs text-white/60">4K 分辨率</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">极速生成</div>
                      <div className="text-xs text-white/60">30 秒完成</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">强大的 AI 功能</h2>
            <p className="text-xl text-white/70">让视频创作变得简单而有趣</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                ),
                title: '文字转视频',
                description: '只需描述你的想法，AI 自动生成精美视频内容',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: '智能风格化',
                description: '多种艺术风格可选，让你的视频独具特色',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: '精细控制',
                description: '调整每一个细节，完全掌控视频生成过程',
                gradient: 'from-pink-500 to-orange-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: '闪电般速度',
                description: '强大的 GPU 集群，30 秒内完成视频生成',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: '音乐配乐',
                description: 'AI 自动匹配背景音乐，让视频更有感染力',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
                title: '一键导出',
                description: '支持多种格式和分辨率，满足各平台需求',
                gradient: 'from-blue-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase Grid */}
      <section id="showcase" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">AI 创作展示</h2>
            <p className="text-xl text-white/70">看看其他创作者用 VibVib 做了什么</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredVideos.map((videoNum) => (
              <div
                key={videoNum}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all cursor-pointer hover:scale-105"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={`/video-${videoNum}.mp4`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-sm font-medium">视频 #{videoNum}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all cursor-pointer">
              查看更多作品
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">选择适合你的方案</h2>
            <p className="text-xl text-white/70">灵活的定价，满足不同需求</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: '免费版',
                price: '¥0',
                period: '永久免费',
                features: ['每月 10 个视频', '720p 分辨率', '基础风格', '社区支持'],
                cta: '开始使用',
                popular: false
              },
              {
                name: '专业版',
                price: '¥99',
                period: '每月',
                features: ['每月 100 个视频', '4K 分辨率', '所有风格', '优先处理', '邮件支持', '无水印'],
                cta: '立即订阅',
                popular: true
              },
              {
                name: '企业版',
                price: '定制',
                period: '联系我们',
                features: ['无限视频', '8K 分辨率', '定制风格', 'API 访问', '专属客服', '私有部署'],
                cta: '联系销售',
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-sm font-semibold">
                    最受欢迎
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-2">{plan.price}</div>
                  <div className="text-white/60">{plan.period}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50'
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h2 className="text-5xl font-bold mb-6">准备好开始创作了吗？</h2>
            <p className="text-xl text-white/70 mb-8">
              加入 50,000+ 创作者，用 AI 让你的创意动起来
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer">
                免费开始创作
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all cursor-pointer">
                预约演示
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl">
                  V
                </div>
                <span className="text-2xl font-bold">VibVib</span>
              </div>
              <p className="text-white/60">用 AI 让创意动起来</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">功能</li>
                <li className="hover:text-white transition-colors cursor-pointer">定价</li>
                <li className="hover:text-white transition-colors cursor-pointer">API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <ul className="space-y-2 text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">文档</li>
                <li className="hover:text-white transition-colors cursor-pointer">教程</li>
                <li className="hover:text-white transition-colors cursor-pointer">博客</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">关于我们</li>
                <li className="hover:text-white transition-colors cursor-pointer">联系我们</li>
                <li className="hover:text-white transition-colors cursor-pointer">加入我们</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/60">
            <p>&copy; 2024 VibVib. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

