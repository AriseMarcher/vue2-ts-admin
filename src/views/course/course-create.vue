<template>
  <div class="course-create">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>

      <el-form label-width="160px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              style="margin-bottom: 10px"
              type="textarea"
              v-model="course.previewFirstField"
              placeholder="概述1"
            ></el-input>
            <el-input
              type="textarea"
              v-model="course.previewSecondField"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师职位">
            <el-input v-model="course.teacherDTO.position"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              label="描述文字"
              v-model="course.sortNum"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <!--
              1. 组件需要根据绑定的数据进行图片预览
              2. 组件需要把上传成功的图片地址同步到绑定的数据中
              v-model 的本质还是父子组件通信
                1. 他会给子组件传递一个名字叫 value 的数据  (props)
                2. 默认监听 input 事件，修改绑定的数据 (自定义事件)
             -->
            <course-image v-model="course.courseListImg"></course-image>
          </el-form-item>
          <el-form-item label="解锁封面">
            <course-image v-model="course.courseImgUrl"></course-image>
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原件">
            <el-input v-model="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="course.sales">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="course.discountsTag"
              maxlength="4"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          秒杀活动
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                v-model="course.activityCourseDTO.beginTime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
            <!-- <el-input type="textarea" v-model="course.courseDescriptionMarkDown"></el-input> -->
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch
              v-model="course.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="activeStep--" v-show="activeStep > 0">上一步</el-button>
          <el-button @click="activeStep++" v-show="activeStep < steps.length - 1">下一步</el-button>
          <el-button type="primary" v-show="activeStep === steps.length - 1" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateCourse
} from '@/services/course'
import CourseImage from './components/couse-image.vue'
import TextEditor from '@/components/text-editor/index.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CourseImage,
    TextEditor
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ],
      imageUrl: '',
      activeText: '',
      isOpenActivity: false,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '<h1>Hello</h1>',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNesDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        }
      }
    }
  },
  created () {
    console.log(this.course)
  },
  methods: {
    handleAvatarSuccess (res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
